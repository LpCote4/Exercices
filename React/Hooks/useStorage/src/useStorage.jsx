import {useEffect, useState} from "react"


export default function useStorage(key, defaultData, isSession = false) {
    // return ['', () => { }];
    const storage = isSession ? sessionStorage : localStorage;
    const [data, setData] = useState(
        JSON.parse(storage.getItem(key)) || String(defaultData)
    );

    useEffect(() => {
        storage.setItem(key, JSON.stringify(data));
    }, [data, key]);

    //vider le storage
    useEffect(() => {
        window.addEventListener('storage', (e) => {
            if(e.key===null){
                setData(defaultData);
            }
        })
    })

    return [data, setData];
};