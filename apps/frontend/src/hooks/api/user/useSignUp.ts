import { UseMutateFunction, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../features/slice/user/userSlice';
import { ILogin } from 'types';

interface IUser {
  id: number;
  username: string;
  role: string[];
  status: string;
}

export interface User {
  user: IUser,
  access_token: string,
  token_type: string,
  expires_in: number
}

async function signUp(username: string, password: string): Promise<ILogin> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  }).catch(reason =>  {
    throw new ResponseError("Error during communication with the api", undefined)
  })

  if (response.status !== 201)
    throw new ResponseError((await response.json()).message, response);

  return await response.json();
}

type IUseSignUp = UseMutateFunction<ILogin, unknown, {
  username: string;
  password: string;
}, unknown>

export function useSignUp(): IUseSignUp {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: signInMutation } = useMutation<ILogin, unknown, { username: string, password: string }, unknown>(
    ({
       username,
       password
     }) => signUp(username, password), {
      onSuccess: (data: ILogin) => {
        // TODO: save the user in the state
        toast.success('Benutzer erfolgreich erstellt')
        navigate('/signin');
      },
      onError: (error) => {
        if (error instanceof ResponseError) {
          if(error.message !== undefined) {
            toast.error(error.message);
            return;
          }
          toast.error("Opps...");
        }
      }
    });

  return signInMutation
}

export class ResponseError extends Error {
  constructor(message: string, public response?: Response) {
    super(message);
  }
}