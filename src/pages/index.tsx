import { useContext } from "react";
import { BetResult } from "../components/betResult";
import { CheckResult } from "../components/checkResult";
import { CreateBet } from "../components/createBet";
import { Header } from "../components/header";
import { Login } from "../components/login";
import { UserContext } from "../context/UserContext";

export default function Home() {
  const { user } = useContext(UserContext)

  return (
    <>
    { user ? <Login /> :
        <div className="xl:container mx-auto h-full bg-slate-200">
          <Header 
            name={user?.name} 
            urlImg={user?.imgProfile}
          />
          <CreateBet />
          <BetResult />
          <CheckResult />
        </div>
    }    
    </>
  )
}
