import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
`

export const Content = styled.main`
    width: 1300px;
    margin: 64px auto;
    background: transparent;

    padding: 64px 80px;

    overflow: hidden;

    header {
        border-bottom: 2px solid #D3E2E5;
        display: flex;
        padding-bottom: 25px;
    }

    span {
        color: #8FA7B2;
    }

    h1 {
        width: 100%;

        font-size: 32px;
        line-height: 34px;
        color: #4D6F80;
        font-weight: 700;
    }
`

export const Article = styled.article`
    margin-top: 40px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 1em;

    section {
        background: #ffffff;
        border-radius: 20px;

        .leaflet-container {
            border: 1px solid #d3e2e5;
            border-radius: 20px;
        }

        div {
            display: flex;
            justify-content: space-between;
            padding: 20px 20px 20px 20px;
            
            h2 {
                color: #4D6F80;
                align-self: center;
            }

            nav {
                display: flex;

                a, 
                button {
                    width: 55px;
                    height: 55px;
                    border-radius: 15px;
                    background: #EBF2F5;
                }

                a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    align-self: flex-end;
                    margin-right: 20px;
                }
            }
        }
    }
`