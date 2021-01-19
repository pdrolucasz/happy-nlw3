import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
`

export const Content = styled.main`
    width: 1300px;
    margin: 64px auto;

    padding: 64px 80px;

    overflow: hidden;

    img {
        border: 1px solid red;
        align-self: center;
    }

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
    grid-template-columns: 2fr 2fr;

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
            padding: 0 20px 20px 20px;
            
            h2 {
                color: #4D6F80;
                align-self: center;
            }

            nav {
                display: flex;

                a {
                    width: 55px;
                    height: 55px;
                    border-radius: 15px;
                    background: #EBF2F5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    align-self: flex-end;
                    margin-right: 20px;
                }

                button {
                    border: 0;
                    background: #EBF2F5;
                    width: 55px;
                    height: 55px;
                    border-radius: 15px;
                }
            }
        }
    }
`