import React from 'react'

function regex() {
    //using regex to check if a string does not start with a number and does not end with an underscore using the regex exec() method

    //regex that can end with only alphanumeric characters
    const regex = /^[^\d]+$/



    const isNotNumberUnderscore = (str: string) => {
        const mine = '(?![0-9._])[a-zA-Z0-9_]*[a-zA-Z0-9]' 
        const his = '(?![0-9._])[a-zA-Z0-9_]*'
        const regex = new RegExp(mine)
        
        const result = regex.exec(str) 
        console.log(result)
    }
    

   isNotNumberUnderscore('23434d_dsfdfdsf_')

    //regex that can't end with underscore
    const isNotUnderscore = (str: string) => {
        const mine = '(?![._])[a-zA-Z0-9]*'
        const regex = new RegExp(mine)
        const result = regex.exec(str)
        console.log({result})
    }

    //isNotUnderscore('4324_')

    //regex to not match numbers and underscores
    const isNotNumberUnderscore2 = (str: string) => {
        let his = '(?![0-9._])[a-zA-Z0-9_]*'
        const regex = new RegExp(his)
        const result2 = regex.exec(str)
        console.log({result2})
    }

    //isNotNumberUnderscore2('_233_')
    return <div></div>
}

export default regex