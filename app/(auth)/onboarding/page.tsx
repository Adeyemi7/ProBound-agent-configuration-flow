import {redirect} from 'next/navigation';

const page = () => {
  return (
    redirect('/onboarding/chooseAgent')
  )
}

export default page