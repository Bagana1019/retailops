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
  migrations/                хүснэгт, trigger, RLS бодлого (дугаарын дарааллаар ажиллуулна)
  functions/admin/           Edge Function: хэрэглэгч үүсгэх / нууц үг шинэчлэх / устгах
  functions/send-push/       Edge Function: Web Push илгээх (notifications insert webhook)
public/                      manifest, service worker, icons (PWA)
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
supabase db push                     # supabase/migrations/*.sql
supabase functions deploy admin      # supabase/functions/admin
```

CLI-гүй бол `supabase/migrations/` доторх SQL файлуудыг дугаарын дарааллаар **SQL Editor**-т хуулж ажиллуулна.
Шинэ migration нэмэгдэх бүрт (жишээ нь `0002_...`) зөвхөн тэр файлыг ажиллуулна.
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

### 6. Push мэдэгдэл (заавал биш)

Шинэ даалгавар, ээлж оноогдоход утсан дээр мэдэгдэл очно. Нэг удаа тохируулна:

```
npx web-push generate-vapid-keys
```

Гарсан **Public Key**-г `.env`-д `VITE_VAPID_PUBLIC_KEY=` гэж нэмнэ (Vercel дээр ч мөн адил, дараа нь redeploy).
Private key-г Supabase-д нууц болгон өгч, функцийг deploy хийнэ:

```
npx supabase secrets set VAPID_PUBLIC_KEY=<public> VAPID_PRIVATE_KEY=<private> VAPID_SUBJECT=mailto:you@example.com
npx supabase functions deploy send-push
```

Дараа нь Dashboard → **Database → Webhooks → Create a new hook**: нэр `send-push`, Table `notifications`,
Events `Insert`, Type **Supabase Edge Functions** → `send-push` сонгоод Confirm. Энэ нь мэдэгдлийн мөр
үүсэх бүрт функцийг дуудаж, тухайн ажилтны бүртгүүлсэн төхөөрөмжүүд рүү push илгээнэ.

Ажилтан бүр өөрийн утсан дээр Тохиргоо → **Push мэдэгдэл → Мэдэгдэл асаах** дарж зөвшөөрнө.
iPhone дээр эхлээд Safari-ийн Share → **Add to Home Screen** хийж апп-ыг суулгасан байх шаардлагатай (iOS 16.4+).
Апп нээлттэй үед realtime-аар ирсэн мэдэгдэл push серверээс үл хамааран шууд харагдана.

### 7. GPS баталгаажуулалт (заавал биш)

Дээд Админ Тохиргоо → **Дэлгүүрийн байршил** хэсэгт дэлгүүрт байхдаа "Одоогийн байршлаа авах" дарж
координатыг хадгална (эсвэл гараар бичнэ), зөвшөөрөх радиусыг метрээр заана (анхдагч 150 м).
Үүний дараа ажилтан зөвхөн тэр радиусын дотор байж цаг тэмдэглэнэ; гадна байвал зай болон хэтэрсэн
метрийг харуулж татгалзана. Бүртгэл бүрт зай хадгалагдаж, менежерийн ирцийн жагсаалт болон тайланд
📍 тэмдэгтэй харагдана. Координатыг хоосон болговол шалгалт унтарна.

## Тайлан экспорт

Тайлан дэлгэц сар сонгож ажилтан тус бүрийн ирсэн өдөр, хоцролт, ажилласан цагийг нэгтгэнэ.
**Excel (CSV)** нь UTF-8 BOM-той CSV татна (Excel дээр кирилл зөв харагдана). **PDF хэвлэх** нь
browser-ийн хэвлэх цонх нээнэ, тэндээс "Save as PDF" сонгоно.

## Эрхийн загвар (RLS)

| Хүснэгт | Ажилтан | Менежер | Дээд Админ |
|---|---|---|---|
| `profiles` | зөвхөн өөрийнх (бусдыг `colleagues` view-ээр утас/и-мэйлгүй) | бүгдийг харах, засах | + эрх, идэвх, нэвтрэх нэр солих |
| `attendance` | өөрийнх: үүсгэх, гарах цаг тэмдэглэх | бүгд | бүгд |
| `tasks` | өөрт оноогдсон: зөвхөн төлөв солих | үүсгэх, засах, устгах | бүгд |
| `shifts` | харах | бүгд | бүгд |
| `notifications` | өөрийнх | өөрийнх | өөрийнх |
| `settings` | харах | харах | засах |
| `push_subscriptions` | өөрийнх | өөрийнх | өөрийнх |

Хэрэглэгч үүсгэх, нууц үг шинэчлэх, устгах нь `service_role` эрх шаарддаг тул `admin` Edge Function-ээр
хийгдэнэ. Функц дуудагчийн JWT-г шалгаж, Дээд Админ (Менежер зөвхөн Ажилтан эрхтэй хэрэглэгч үүсгэнэ)
эсэхийг `profiles`-оос баталгаажуулна.

Даалгавар, ээлж оноогдоход DB trigger тухайн ажилтанд мэдэгдэл үүсгэнэ. Realtime-аар бүх
төхөөрөмж дээр өгөгдөл шууд шинэчлэгдэнэ.
