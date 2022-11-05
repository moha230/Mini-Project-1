import React from 'react'
import Spinner from './Spinner'


function ExchangeResult({ Loading, result }) {
    return (
        <>
            {Loading ? (
                <Spinner />
            ) : (
                    <>
                        <h1 className="result">{result}</h1>
                    </>
                
            )}
        </>
    )
}

export default ExchangeResult
