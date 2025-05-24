import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { AppDispatch } from '../../../store/store';
import createAccount from '../../../../api/stripe/createAccount';
import readDashboardStripe from '../../../../api/stripe/readDashboardStripe';

const AdminSocietePaiementLigne = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const userDataLocal = localStorage.getItem('userData');
  const userData = userDataLocal ? JSON.parse(userDataLocal) : null;
  const stripeAccount = userData?.stripe_account;

  const handleCreateAccount = async () => {
    setIsLoading(true);
    await dispatch(createAccount()).unwrap();
  };

  const handleStripeDashboard = async () => {
    try {
      setStripeError(null);
      await dispatch(readDashboardStripe()).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setStripeError(error || 'Erreur lors de la redirection vers Stripe.');
    }
  };

  return (
    <div className="fixed w-[calc(100%-373px)] h-full overflow-scroll">
      <header className="fixed flex items-center justify-between top-16 left-[373px] w-[calc(100%-373px)] bg-zinc-200 h-16 px-12 border-b-[1px] border-gray-400 z-10">
        <h1 className="text-2xl">Gérer les paiements en ligne</h1>
      </header>

      <section className="w-11/12 m-auto mt-20 mb-4">
        <p className="mb-4 ml-4">
          Pour proposer le paiement en ligne, merci de créer votre compte via Stripe en cliquant sur le bouton ci-dessous. Une commission de 5% +
          1.25€ sera prélevée sur chaque paiement par Gochasse afin de couvrir les frais bancaires.
        </p>

        {!stripeAccount && (
          <button
            type="button"
            onClick={handleCreateAccount}
            disabled={isLoading}
            className="flex items-center justify-center gap-4 mt-4 text-lg w-90 m-auto bg-green-600 text-white px-60 py-2 rounded-md hover:ring-2 hover:ring-green-600 hover:bg-white hover:text-green-600 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Redirection vers Stripe en cours...</p>
              </div>
            ) : (
              <p className="font-semibold">Créer mon compte Stripe</p>
            )}
          </button>
        )}

        {stripeAccount && (
          <div className="mt-10 text-lg text-center font-semibold">
            <p>Votre compte Stripe est déjà créé. Vous pouvez le gérer directement sur la plateforme Stripe.</p>
            <button
              type="button"
              onClick={handleStripeDashboard}
              className="flex items-center justify-center gap-4 mt-4 text-lg w-3/4 m-auto bg-green-600 text-white px-60 py-2 rounded-md hover:ring-2 hover:ring-green-600 hover:bg-white hover:text-green-600 disabled:opacity-50"
            >
              Gérer mon compte Stripe
            </button>

            {stripeError && <p className="mt-4 text-red-600 text-sm font-normal">⚠️ {stripeError}</p>}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminSocietePaiementLigne;
