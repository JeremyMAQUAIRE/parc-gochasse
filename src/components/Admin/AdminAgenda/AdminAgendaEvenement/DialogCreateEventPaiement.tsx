import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { actionChangeEventAcompte, actionChangeEventPaiementOnLine } from '../../../store/actionCreator';
import { AppDispatch, RootState } from '../../../store/store';

interface DialogCreateEventPaiementProps {
  isValidStripe: boolean;
}

const DialogCreateEventPaiement = ({ isValidStripe }: DialogCreateEventPaiementProps) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const event = useSelector((state: RootState) => state.eventReducer);
  const prestationModel = useSelector((state: RootState) => state.prestationReducer);

  const userDataLocal = localStorage.getItem('userData');
  const userData = userDataLocal ? JSON.parse(userDataLocal) : null;
  const isStripeAccountConnected = userData?.stripe_account;

  useEffect(() => {
    if (isStripeAccountConnected && !isValidStripe) {
      dispatch(actionChangeEventPaiementOnLine('surPlace'));
    } else if (!isStripeAccountConnected) {
      dispatch(actionChangeEventPaiementOnLine('surPlace'));
    }
  }, [isStripeAccountConnected, isValidStripe, dispatch, event.paiementOnLine]);

  return (
    <div className="flex justify-between items-center mt-4">
      <label htmlFor="paiement" className="text-lg font-medium text-gray-900">
        Paiement <span className="text-green-600 font-bold pl-1">*</span>
      </label>

      {isStripeAccountConnected && isValidStripe ? (
        <select
          id="paiement"
          name="paiement"
          defaultValue={event.paiementOnLine === 'surPlace' ? 'surPlace' : 'enLigne'}
          className="flex w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none border border-gray-300 rounded-md focus:border-green-600 disabled:bg-gray-200"
          onChange={(e) => {
            const selected = e.target.value;
            dispatch(actionChangeEventPaiementOnLine(selected));
            dispatch(actionChangeEventAcompte(selected === 'surPlace' ? 0 : prestationModel.price));
          }}
        >
          <option value="enLigne">En ligne</option>
          <option value="surPlace">Sur place</option>
        </select>
      ) : (
        <div>
          {!(isStripeAccountConnected && isValidStripe) && (
            <div>
              <select
                id="paiement"
                name="paiement"
                defaultValue="surPlace"
                disabled
                className="flex w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 bg-white border border-gray-300 rounded-md disabled:bg-gray-200"
              >
                <option value="enLigne">En ligne</option>
                <option value="surPlace">Sur place</option>
              </select>

              {/* Messages d’erreur séparés en blocs conditionnels */}
              {!isStripeAccountConnected && (
                <>
                  <p className="w-[550px] text-center mt-2 text-red-500 text-sm">
                    Pour activer le paiement en ligne, vous devez d&apos;abord créer et connecter votre compte Stripe.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/administration/paiement-en-ligne')}
                    className="w-[550px] mt-2 text-sm text-red-500 hover:underline text-center"
                  >
                    Créer mon compte Stripe
                  </button>
                </>
              )}

              {isStripeAccountConnected && !isValidStripe && (
                <>
                  <p className="w-[550px] text-center mt-2 text-red-500 text-sm">
                    Votre compte Stripe n&apos;est pas encore correctement configuré. Veuillez contacter l&apos;administrateur Gochasse pour le
                    réinitialiser.
                  </p>
                  <p className="w-[550px] text-center mt-2 text-red-500 text-sm">ID Compte Stripe : {userData.id_stripe_account}</p>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DialogCreateEventPaiement;
