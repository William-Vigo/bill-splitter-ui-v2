import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import React from "react"
import { create } from "zustand"
import BillConfig from "@/components/desktop/billConfig"
import ReceiptsOverview from "@/components/desktop/receiptOverview"
import { useReciptsState } from "./desktop/receipt"

export type BillStepper = {
    step: number
    incrementStep: () => void
    decrementStep: () => void
}

export const useStepper = create<BillStepper>((set) => ({
    step: 0,
    incrementStep: () =>
        set((state) => {
            return {
                step: state.step + 1,
            }
        }),
    decrementStep: () =>
        set((state) => {
            if (state.step === 0) {
                return {
                    step: 0,
                }
            }
            return {
                step: state.step - 1,
            }
        }),
}))

const steps = [
    {
        label: "Setup splits",
        comp: BillConfig,
    },
    {
        label: "Results",
        comp: ReceiptsOverview,
    },
]
export default function BillSteps() {
    const step = useStepper((state) => state.step)
    const back = useStepper((state) => state.decrementStep)
    const StepComp = steps[step].comp
    const clear = useReciptsState((state) => state.clearReceipt)
    const handleBackClick = () => {
        clear()
        back()
    }
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <StepComp />
            <Stepper activeStep={step}>
                {steps.map((step) => {
                    return (
                        <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {step !== 0 ? (
                <Box>
                    <Button onClick={handleBackClick}>Back</Button>
                </Box>
            ) : (
                <></>
            )}
        </Box>
    )
}
