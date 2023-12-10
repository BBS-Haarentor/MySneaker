import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IUser {
  id: number;
  username: string;
  role: string[];
  status: string;
}

interface User {
  user: IUser,
  access_token: string,
  token_type: string,
  expires_in: number
}

async function signIn(username: string, password: string): Promise<User> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  if (response.status !== 200)
    throw new ResponseError((await response.json()).message, response);

  return await response.json();
}

type IUseSignIn = UseMutateFunction<User, unknown, {
  username: string;
  password: string;
}, unknown>

export function useSignIn(): IUseSignIn {
  const navigate = useNavigate();

  const { mutate: signInMutation } = useMutation<User, unknown, { username: string, password: string }, unknown>(
    ({
       username,
       password
     }) => signIn(username, password), {
      onSuccess: (data) => {
        // TODO: save the user in the state
        console.log(data)
        navigate('/');
      },
      onError: (error) => {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        }
      }
    });

  return signInMutation
}

export class ResponseError extends Error {
  constructor(message: string, public response: Response) {
    super(message);
  }
}