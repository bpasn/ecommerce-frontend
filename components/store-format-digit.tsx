"use client";

const FormatDigitToUsd = (props: { amount:number }) => {
    const format = new Number(props.amount).toLocaleString(
        "es-US",
        {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }
    )
    return (
        <span>{format}</span>
    )
}

export default FormatDigitToUsd