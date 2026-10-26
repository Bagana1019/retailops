import { useState } from "react";
import Icon from "../components/Icon";
import { Badge, Btn, Card, Inp, Sel } from "../components/ui";
import { T } from "../i18n";
import { S, priorityColor, statusColor } from "../theme";

// ─── TASKS ────────────────────────────────────────────────────────────────────
const TasksScreen = ({ tasks, setTasks, employees, user }) => {
  const [filter, setFilter] = useState("Бүгд"); const [showForm, setShowForm] = useState(false); const [sel, setSel] = useState(null);
  const [form, setForm] = useState({ title: "", assignee: "", deadline: "", priority: "Дунд", notes: "" });
  const statuses = ["Бүгд", T.pending, T.inProgress, T.completed];
  const canCreate = user.role === "Director" || user.role === "Manager";
  // Employees only ever see (and can only update) tasks assigned to them.
  const isEmployee = user.role === "Employee";
  const visible = isEmployee ? tasks.filter(t => t.assignee === user.id) : tasks;
  const filtered = visible.filter(t => filter === "Бүгд" || t.status === filter);
  const addTask = () => { if (!form.title || !form.assignee) return; setTasks(prev => [...prev, { ...form, id: Date.now(), status: T.pending, assignee: parseInt(form.assignee) }]); setForm({ title: "", assignee: "", deadline: "", priority: "Дунд", notes: "" }); setShowForm(false); };
  const updateStatus = (id, status) => { if (!visible.some(t => t.id === id)) return; setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t)); if (sel?.id === id) setSel(prev => ({ ...prev, status })); };

  if (sel) {
    const assignee = employees.find(e => e.id === sel.assignee);
    return (
      <div style={{ padding: 16 }}>
        <button onClick={() => setSel(null)} style={{ background: "none", border: "none", color: S.accent, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, padding: "0 0 16px 0", fontFamily: "inherit" }}><Icon name="back" size={16} /> {T.backToTasks}</button>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ color: S.text, fontSize: 16, fontWeight: 700, flex: 1, marginRight: 8 }}>{sel.title}</div>
            <Badge label={sel.priority} color={priorityColor(sel.priority)} />
          </div>
          <div style={{ marginBottom: 14 }}><Badge label={sel.status} color={statusColor(sel.status)} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div><div style={{ color: S.textMuted, fontSize: 11, marginBottom: 4 }}>{T.assignedTo}</div><div style={{ color: S.text, fontSize: 13, fontWeight: 600 }}>{assignee?.name || T.unassigned}</div></div>
            <div><div style={{ color: S.textMuted, fontSize: 11, marginBottom: 4 }}>{T.deadline.toUpperCase()}</div><div style={{ color: S.text, fontSize: 13, fontWeight: 600 }}>{sel.deadline}</div></div>
          </div>
          {sel.notes && <div style={{ background: S.bgInput, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}><div style={{ color: S.textMuted, fontSize: 11, marginBottom: 4 }}>{T.notes.toUpperCase()}</div><div style={{ color: S.textDim, fontSize: 13 }}>{sel.notes}</div></div>}
          <div style={{ color: S.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{T.updateStatus}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[T.pending, T.inProgress, T.completed].map(s => <Btn key={s} size="sm" variant={sel.status === s ? "primary" : "secondary"} onClick={() => updateStatus(sel.id, s)}>{s}</Btn>)}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ color: S.text, fontSize: 20, fontWeight: 700 }}>{isEmployee ? T.myTasks : T.tasksTitle}</div>
        {canCreate && <Btn size="sm" icon="plus" onClick={() => setShowForm(!showForm)}>{T.newTask}</Btn>}
      </div>
      {showForm && (
        <Card style={{ marginBottom: 16 }}>
          <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{T.newTask}</div>
          <Inp label={T.taskTitle} value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
          <Sel label={T.assignTo} value={form.assignee} onChange={v => setForm(f => ({ ...f, assignee: v }))} options={[{ value: "", label: T.select }, ...employees.filter(e => e.active).map(e => ({ value: e.id, label: e.name }))]} />
          <Inp label={T.deadline} type="date" value={form.deadline} onChange={v => setForm(f => ({ ...f, deadline: v }))} />
          <Sel label={T.priority} value={form.priority} onChange={v => setForm(f => ({ ...f, priority: v }))} options={[{ value: "Өндөр", label: "🔴 " + T.high }, { value: "Дунд", label: "🟡 " + T.medium }, { value: "Бага", label: "⚪ " + T.low }]} />
          <Inp label={T.notes} value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} placeholder={T.optionalNotes} />
          <div style={{ display: "flex", gap: 8 }}><Btn full onClick={addTask}>{T.createTask}</Btn><Btn variant="secondary" onClick={() => setShowForm(false)}>{T.cancel}</Btn></div>
        </Card>
      )}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {statuses.map(s => <button key={s} onClick={() => setFilter(s)} style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: filter === s ? S.accent : S.bgCard, color: filter === s ? "#fff" : S.textMuted }}>{s} {s !== "Бүгд" && `(${visible.filter(t => t.status === s).length})`}</button>)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(task => { const assignee = employees.find(e => e.id === task.assignee); return (
          <Card key={task.id} style={{ padding: 14, cursor: "pointer" }} onClick={() => setSel(task)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ color: S.text, fontSize: 13, fontWeight: 600, flex: 1, marginRight: 8 }}>{task.title}</div>
              <Badge label={task.priority} color={priorityColor(task.priority)} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ color: S.textMuted, fontSize: 11 }}>👤 {assignee?.name || T.unassigned}</div>
              <div style={{ color: S.textMuted, fontSize: 11 }}>📅 {task.deadline}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Badge label={task.status} color={statusColor(task.status)} />
              {task.status === T.completed && <Icon name="check" size={16} color={S.success} />}
            </div>
          </Card>
        ); })}
        {filtered.length === 0 && <div style={{ color: S.textMuted, textAlign: "center", padding: "32px 0", fontSize: 13 }}>{T.noTasks}</div>}
      </div>
    </div>
  );
};

export default TasksScreen;
