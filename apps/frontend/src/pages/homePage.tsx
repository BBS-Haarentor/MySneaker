import BasicButton from '../components/BasicButton';
import {useNavigate} from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={"flex lg:flex-row flex-col flex-nowrap w-full h-full justify-center"}>
        <div className="lg:w-1/2 w-full flex items-center justify-center">
          <div className="max-lg:text-center">
            <h1 className="mx-5 text-6xl text-secondary font-bold">MySneaker</h1>
            <p className={"max-w-[500px] mx-5 mt-5 text-lg"}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 w-full max-lg:mt-5 relative flex items-center justify-center">
          <div className="flex flex-col">
            <BasicButton text={"Anmelden"} className="my-2" onClick={() => navigate('/singin')}/>
            <BasicButton text={"Registrieren"} className="my-2" onClick={() => navigate('/signup')}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;