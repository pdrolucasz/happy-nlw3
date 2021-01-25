import styled from 'styled-components'

export const Container = styled.div`
    div {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 16px;

        img {
            width: 100%;
            height: 96px;
            object-fit: cover;
            border-radius: 20px;
        }

        label {
            height: 96px;
            background: #F5F8FA;
            border: 1px dashed #96D2F0;
            border-radius: 20px;
            cursor: pointer;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    input[type=file] {
        visibility: hidden;
    }
`