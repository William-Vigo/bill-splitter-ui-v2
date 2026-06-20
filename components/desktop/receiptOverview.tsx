import ReceiptCard, { Receipt, useReciptsState } from "./receipt"

export default function ReceiptOverview() {
    const receipts = useReciptsState((state) => state.receipts)
    return (
        <>
            {receipts.map((receipt, index) => (
                <ReceiptCard key={index} {...receipt} />
            ))}
        </>
    )
}
