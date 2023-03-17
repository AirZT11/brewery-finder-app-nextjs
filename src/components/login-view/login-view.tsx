import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { FC } from "react"
import Account from "../account/account"
import { LoginViewProps } from "./login-view.props"

const LoginView: FC<LoginViewProps> = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  return !session ? (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
    />
  ) : (
    <Account session={session} />
  )
}

export default LoginView
