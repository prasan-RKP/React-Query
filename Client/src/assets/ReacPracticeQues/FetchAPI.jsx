import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function FetchAPI() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await fetch('https://jsonplaceholder.typicode.com/uses');
                if (!res.ok) {
                    throw new Error({msg: "Request Failed, Failed to fetch data.."})
                }
                const val = await res.json();
                setData(val);
            } catch (error) {
                if (error.msg) {
                    setError(error.msg);
                }
                else {
                    setError("Failed to Fetch Data");
                }

            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <>
                <div className="flex flex-col items-center justify-center h-40 text-base-content"> <Loader2 className="w-6 h-6 animate-spin mb-2" /> <span>Processing...</span> </div>
            </>
        )
    }


    if (error) {
        return (
            <>
                <div className="alert alert-error shadow-lg max-w-3xl mx-auto mt-4">
                    <span>🚨 {error}</span>
                </div>
            </>
        )
    }


    return (

        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">📦 API Data</h2>
            <div className="overflow-y-auto max-h-[400px] border border-base-300 rounded-box p-4 bg-base-100 shadow-md">
                {data.map(item => (
                    <div key={item.id} className="mb-4 p-4 bg-base-200 rounded-box">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-sm text-base-content">{item.phone}</p>
                        <p className="text-sm text-base-content">{item.website}</p>
                        <p className="text-sm text-base-content">{item.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FetchAPI;
