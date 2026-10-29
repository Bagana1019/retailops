# Btech Store — Дотоод үйл ажиллагааны платформ

Дэлгүүрийн ажилтан, ирц, даалгавар, ээлжийн хуваарь, тайланг удирдах mobile-first вэб апп.
React 18 + Vite. Backend нь **Supabase** (Postgres + Auth + Realtime). Supabase тохируулаагүй үед
апп автоматаар **демо горим**-д ажиллаж, өгөгдлийг тухайн browser-ийн localStorage-д хадгална.

```
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/
```

## Бүтэц

```
src/
  App.jsx               state ба дэлгэц холбох
  store/                backend давхарга (нэг интерфэйс, хоёр хэрэгжилт)
    index.js            Supabase тохируулсан бол supabaseStore, үгүй бол localStore
    supabaseStore.js    Supabase Auth + Postgres + Realtime
    localStore.js       localStorage демо
  screens/              дэлгэц бүр нэг файл
  components/           Icon, TopBar, BottomNav, ui (Badge, Card, Inp, Btn ...)
  i18n.js  theme.js  data/mock.js  utils/date.js  lib/supabase.js
supabase/
  migrations/0001_init.sql   хүснэгт, trigger, RLS бодлого
  functions/admin/           Edge Function: хэрэглэгч үүсгэх / нууц үг шинэчлэх / устгах
scripts/seed-demo.mjs        демо хэрэглэгч, өгөгдөл оруулах
```

## Supabase холбох

### 1. Төсөл үүсгэх
[supabase.com](https://supabase.com) дээр шинэ төсөл үүсгэнэ. **Project Settings → API** хэсгээс
`Project URL`, `anon public` key, `service_role` key-г хуулж авна.

### 2. Auth тохиргоо
Ажилтнууд богино нэвтрэх нэрээр (`director`, `emp1` ...) нэвтэрдэг. Supabase Auth и-мэйл шаарддаг тул
апп нэвтрэх нэрийг `<нэр>@btech.local` и-мэйл болгон хувиргана. Үүний тулд:

- **Authentication → Providers → Email**: `Confirm email`-ийг **унтраана** (хэрэглэгчдийг админ үүсгэдэг, баталгаажуулах и-мэйл явахгүй).
- Хүсвэл домэйнийг `VITE_AUTH_EMAIL_DOMAIN` env-ээр солино (seed script-д `AUTH_EMAIL_DOMAIN` мөн адил байх ёстой).

### 3. Схем суулгах
[Supabase CLI](https://supabase.com/docs/guides/cli) суулгасан бол:

```
supabase login
supabase link --project-ref <project-ref>
supabase db push                     # supabase/migrations/0001_init.sql
supabase functions deploy admin      # supabase/functions/admin
```

CLI-гүй бол `supabase/migrations/0001_init.sql` файлын агуулгыг **SQL Editor**-т хуулж ажиллуулна.
Edge Function-ийг Dashboard-ын **Edge Functions** хэсгээс `admin` нэртэйгээр үүсгэж, `index.ts`-ийн
агуулгыг хуулна. Функц `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` гурван
орчны хувьсагчийг Supabase автоматаар өгдөг тул нэмэлт тохиргоо хэрэггүй.

### 4. Демо өгөгдөл (заавал биш)

```
SUPABASE_URL=https://xxxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=eyJ... node scripts/seed-demo.mjs
```

`director/123456`, `manager/123456`, `emp1..3/123456` хэрэглэгчид болон жишээ даалгавар, ээлж, ирц үүснэ.
Эхний Дээд Админ хэрэглэгчээ seed script-гүйгээр үүсгэх бол **Authentication → Users → Add user**
дээр и-мэйл `director@btech.local`, нууц үг оруулаад, **User Metadata**-д
`{"username":"director","name":"Сараа Болд","role":"Director"}` гэж бичнэ. Trigger автоматаар `profiles`
мөр үүсгэнэ.

### 5. Апп-ын env

`.env.example`-ийг `.env` болгон хуулж бөглөнө (Vercel дээр **Environment Variables**-д мөн адил):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_AUTH_EMAIL_DOMAIN=btech.local
```

`anon` key-г browser-т оруулах нь зөв; `service_role` key-г **хэзээ ч** апп-д оруулж болохгүй.

## Эрхийн загвар (RLS)

| Хүснэгт | Ажилтан | Менежер | Дээд Админ |
|---|---|---|---|
| `profiles` | зөвхөн өөрийнх (бусдыг `colleagues` view-ээр утас/и-мэйлгүй) | бүгдийг харах, засах | + эрх, идэвх, нэвтрэх нэр солих |
| `attendance` | өөрийнх: үүсгэх, гарах цаг тэмдэглэх | бүгд | бүгд |
| `tasks` | өөрт оноогдсон: зөвхөн төлөв солих | үүсгэх, засах, устгах | бүгд |
| `shifts` | харах | бүгд | бүгд |
| `notifications` | өөрийнх | өөрийнх | өөрийнх |
| `settings` | харах | харах | засах |

Хэрэглэгч үүсгэх, нууц үг шинэчлэх, устгах нь `service_role` эрх шаарддаг тул `admin` Edge Function-ээр
хийгдэнэ. Функц дуудагчийн JWT-г шалгаж, Дээд Админ (Менежер зөвхөн Ажилтан эрхтэй хэрэглэгч үүсгэнэ)
эсэхийг `profiles`-оос баталгаажуулна.

Даалгавар, ээлж оноогдоход DB trigger тухайн ажилтанд мэдэгдэл үүсгэнэ. Realtime-аар бүх
төхөөрөмж дээр өгөгдөл шууд шинэчлэгдэнэ.
