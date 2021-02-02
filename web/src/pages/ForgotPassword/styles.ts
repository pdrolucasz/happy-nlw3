import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`

export const Background = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    
    background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);

    div {
        font-size: 24px;
        line-height: 34px;

        display: flex;
        flex-direction: column;

        text-align: center;
        margin-top: 100px;

        strong {
            font-weight: 800;
        }
    }
`

export const Login = styled.main`
    width: 45vw;
    height: 100vh;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;

    > a {
        width: 48px;
        height: 48px;
        border-radius: 15px;
        background: #EBF2F5;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: flex-end;
        margin: 50px;
    }

    form {
        background: #FFFFFF;
  
        padding: 64px 70px;
  
        overflow: hidden;

        p {
            color: #5C8599;
            margin-bottom: 50px;
        }

        label {
            display: flex;
            color: #8FA7B3;
            margin-bottom: 8px;
            line-height: 24px;
        }

        legend {
            width: 100%;

            font-size: 32px;
            line-height: 34px;
            color: #5C8599;
            font-weight: 700;

            padding-bottom: 24px;
        }

        button {
            margin-top: 32px;
        }
    }
`