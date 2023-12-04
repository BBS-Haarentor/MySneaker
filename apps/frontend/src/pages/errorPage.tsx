import { Link, useRouteError } from 'react-router-dom';

type ErrorResponse = {
  data: any;
  status: number;
  statusText: string;
  message?: string;
};

const errorCheck = (error: any): error is ErrorResponse => {
  return "data" in error && "status" in error && "statusText" in error;
};

const errorPage = () => {
  const error = useRouteError();

  if (errorCheck(error)) {
    return (
      <>
        <section className="flex items-center min-h-screen p-16 dark:bg-primary-dark bg-primary-light">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 text-white">
            <div className="max-w-md text-center">
              <h2 className="mb-8 font-extrabold text-9xl">
                <span className="sr-only">Error</span>{error.status}
              </h2>
              <p className="text-2xl font-semibold md:text-3xl">{error.statusText}</p>
              <p className="mt-4 mb-8">Es kommt zurzeit leider zu einen Fehler auf diese Seite, bitte gehen Sie doch einfach zur Hauptseite zurück.</p>
              <Link rel="noopener noreferrer" to="/"
                 className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900">Zurück zur Hauptseite</Link>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (<></>)
  }
}

export default errorPage;