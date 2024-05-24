import axios from "axios"
import { useEffect, useState } from 'react';

function Home() {
    
    return (
        <>
            <h1>EquiPro Inc</h1>
            <div>
                <p>
                Welcome to our premier horse show management platform, where elegance meets efficiency. Harnessing cutting-edge technology, we seamlessly track attendance and manage bets for horse show enthusiasts worldwide. Whether you're a seasoned professional or a passionate spectator, our platform ensures a thrilling experience, every step of the way. Join us and elevate your horse show journey to new heights.
                </p>
            </div>
            <div>
            <h2>Diagnostic Data</h2>
                {content}
            </div>
        </>
    );
};

export default Home;