import ReceiptCard, { Receipt } from "./receipt"

type props = {
    receipts: Receipt[]
}

export default function ReceiptOverview({ receipts }: props) {
    return (
        <>
            {receipts.map((receipt, index) => (
                <ReceiptCard key={index} {...receipt} />
            ))}
        </>
    )
}
