import React, { useState, useEffect } from 'react';
import axios from 'axios'; // for making HTTP requests
import { Card, Accordion, Button } from "react-bootstrap";

function Customization() {
    const [logoUrl, setLogoUrl] = useState('');
    // const [primaryColor, setPrimaryColor] = useState('#000000'); // Default to black
    // const [secondaryColor, setSecondaryColor] = useState('#000000'); // Default to black
    const [merchantLink, setMerchantLink] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const primaryColor = localStorage.getItem("primary_color");
  const secondaryColor = localStorage.getItem("secondary_color");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = 'http://localhost:8000/merchCustom/create';
        
        // Get the access token from local storage
        const accessToken = localStorage.getItem('accessToken');

        try {
            const response = await axios.post(apiUrl, {
                logo_url: logoUrl,
                primary_color_schema: primaryColor,
                secondary_color_schema: secondaryColor
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}` // Include the access token in the request headers
                }
            });

            console.log(response.data);
            setMerchantLink(response.data.merchant_link);
            // handle success, maybe redirect or show a success message
        } catch (error) {
            console.error('Error:', error);
            // handle error, show an error message to the user
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(merchantLink);
        setCopySuccess('Copied!');
    };

    useEffect(() => {
        const fetchMerchantLink = async () => {
            const apiUrl = 'http://localhost:8000/merchCustom/get';
            const accessToken = localStorage.getItem('accessToken');
            
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setMerchantLink(response.data[0].merchant_link);
            } catch (error) {
                console.error('Error fetching merchant link:', error);
            }
        };

        fetchMerchantLink();
    }, []);

    return (
        <div>
            <h2>Customize your portal</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Logo URL:</label>
                    <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
                </div>
                {/* <div>
                    <label>Primary Color:</label>
                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                </div>
                <div>
                    <label>Secondary Color:</label>
                    <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                </div> */}
                <Button style={{ backgroundColor : primaryColor, color : secondaryColor }} type="submit">Save</Button>
            </form>
            {merchantLink && (
                <div>
                    <label>Merchant Link:</label>
                    <input type="text" value={merchantLink} readOnly />
                    <button onClick={copyToClipboard}>Copy to Clipboard</button>
                    {copySuccess && <span>{copySuccess}</span>}
                </div>
            )}
        </div>
    );
}

export default Customization;
