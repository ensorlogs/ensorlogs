-- Ensor.Logs — push subscriptions are managed only server-side (/api/push, service role)
drop policy if exists "public delete own push sub" on public.push_subscriptions;
drop policy if exists "public insert push sub" on public.push_subscriptions;
