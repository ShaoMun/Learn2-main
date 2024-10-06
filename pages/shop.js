import Shop from "../components/Shop";
import FloatingLoginButton from '../components/FloatingLoginButton';
import FloatingBalance from '../components/FloatingBalance';

export default function Home() {
  return(
    <div>
      <FloatingBalance />
      <FloatingLoginButton />
      <Shop />
    </div>
  ) 

   
}