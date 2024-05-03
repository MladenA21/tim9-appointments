import React from 'react'
import ReccomendationCard from './ReccomendationCard'

const Reccomendations = () => {
    return (
        <div className='container-fluid h-100 text-white'>
            <div className='mx-5 rounded-3 pb-4' style={{ backgroundColor: "#2f3234" }}>
                <h3 className='text-center py-3 fw-bold fs-2' style={{ color: "#878889" }}>reccomendations</h3>
                <div className='d-flex'>
                    <div className='mx-2'>
                        <div className='mt-4 fs-3' style={{ cursor: "pointer" }}>&#9665;</div>
                    </div>
                    <ReccomendationCard />
                    <ReccomendationCard />
                    <ReccomendationCard />
                    <div className='mx-2'>
                        <div className='mt-4 fs-3'  style={{ cursor: "pointer" }}>&#9655;</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reccomendations
