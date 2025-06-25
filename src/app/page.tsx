// import ButtonComponent from "@/components/ButtonComponent";
// import StaticPage from "./static/page";

import Link from "next/link";

// import { AuthRequiredError } from "@/lib/exception";

// import BackwardButton from "@/components/BackwardButton";
// import ForwardButton from "@/components/ForwardButton";
// import RoutingComponent from "@/components/RoutingButton";

export default function Home() {

  // const session = null;

  // if(!session) throw new AuthRequiredError();

  return <div>
    <Link href={'/signup'} className="border p-4 bg-red-500 text-white">Link To SignUp</Link>
  </div>
 
}
