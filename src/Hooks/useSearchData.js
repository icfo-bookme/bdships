import { useState, useEffect } from 'react';
import getTourDestination from "@/services/getTourDestination";
import getproperties from '@/services/tour/getproperties';

const transformPropertiesData = (properties, typeContext = "Property") => {
    return (properties || []).map(property => ({
        id: `${property.property_id}`, 
        name: property.property_name,
        country: typeContext,
        type: "property",
        originalData: property 
    }));
};

export const useSearchData = (dataSource) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let result;

                switch (dataSource) {
                    case 'ships':
                        const [destinationsRes, propertiesRes] = await Promise.all([
                            getTourDestination(),
                            getproperties(1)
                        ]);

                        let destinations = [];
                        if (destinationsRes?.success) {
                            destinations = destinationsRes.data.filter(item =>
                                item.isShow === "yes" || item.isShow === undefined
                            ) || [];
                        }

                        const shipsData = [
                            ...destinations.map(dest => ({ ...dest, type: "destination" })),
                            ...transformPropertiesData(propertiesRes, "Boat Property")
                        ];

                        setData(shipsData);
                        break;
                    default:
                        setData([]);
                }
            } catch (err) {
                setError(`Failed to load ${dataSource} data`);
                console.error(`Error loading ${dataSource} data:`, err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dataSource]);

    return { data, loading, error };
};