import { useEffect, useState } from "react";
import CurrencyDropdown from './dropdown.jsx';
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1)
    const [fromCurrency, setfromCurrency] = useState("USD");
    const [toCurrency, settoCurrency] = useState("EUR");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [converting, setConverting] = useState(false);
    const [error, setError] = useState("");


    const fetchCurrencies = async ()=> {
        try {
            const res = await fetch ("https://api.frankfurter.dev/v1/currencies");
            const data = await res.json();

            setCurrencies(Object.keys(data));
        } catch (error) {
            console.error("Error fetching", error);
        }
    };

    useEffect(()=>{
        fetchCurrencies();
    }, []);

  const convertCurrency = async() => {
        if (!amount)return;
        setConverting(true);
        try {
            const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const data = await res.json();

            setConvertedAmount(`${data.rates[toCurrency]} ${toCurrency}`);
        } catch (error) {
            console.error("Error fetching", error);
        } finally {
            setConverting(false);
        }
  };

  const handleFavorite = (currency) => {

  }

  const swapCurrencies =() => {
    setfromCurrency(toCurrency);
    settoCurrency(fromCurrency);
  }

    return(
        <div className="max-w-xl mx-auto p-5 mb-20 bg-white rounded-lg shadow-md">
            <h2 className="mb-5 text-2xl font-semibold text-gray-700">Currency Converter</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <CurrencyDropdown 
                    currencies={currencies} 
                    title="From:" 
                    currency={fromCurrency}
                    setCurrency={setfromCurrency}
                    handleFavorite={handleFavorite}/>

                    <div className="flex justify-center -mb-5 sm:mb-0">
                        <button onClick={swapCurrencies} className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                            <FaArrowRightArrowLeft className="text-md text-gray-700"/>
                        </button>
                    </div>

                <CurrencyDropdown 
                    currencies={currencies} 
                    title="To:" 
                    currency={toCurrency}
                    setCurrency={settoCurrency}
                    handleFavorite={handleFavorite}/>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="amount">Amount:</label>
                <input 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1" type="number" />
            </div>

            <div className="flex justify-end mt-6">
                <button onClick={convertCurrency} className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer focus:ring-offset-2
                                ${converting?"animate-pulse" : ""}`}>
                                    Convert
                </button>
            </div>

        {error && <div className="mt-3 text-sm text-red-600 text-right">{error}</div>}

        {convertedAmount &&  <div className="mt-4 text-lg font-medium text-green-600 text-right">
                Converted Amount: {convertedAmount}
            </div>}
        </div>
        
    )
}
export default CurrencyConverter