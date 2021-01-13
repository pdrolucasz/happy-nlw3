import styled from 'styled-components'

export const Container = styled.div`
    input[type="checkbox"] {
        display: none;
    }

    label {
        position: relative;
        color: #8FA7B3;
    }

    input[type=checkbox] + label::before{
        content: "";
        width: 25px;
        height: 25px;
        border-radius: 5px;
        background-color: #F5F8FA;
        border: 1px solid #D3E2E5;
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
        margin-bottom: 3px;
    }

    input[type=checkbox]:checked + label::before {
        background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 10 10'%3E%3Cg class='nc-icon-wrapper' stroke-width='1' fill='%23555555'%3E%3Cpath fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' data-cap='butt' d='M2.83 4.72l1.58 1.58 2.83-2.83'/%3E%3C/g%3E%3C/svg%3E");
        background-color: #37C77F;
        background-position: center;
        border: none;
        padding: 1px;
    }
`