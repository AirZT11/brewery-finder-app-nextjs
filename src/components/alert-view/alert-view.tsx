import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"
import { FC, useRef } from "react"

export interface AlertViewProps {
  header?: string
  body: string
  alertIsOpen: boolean
  closeAlert: () => void
  onSubmit?: () => void
  closeModal?: () => void
}

export const AlertView: FC<AlertViewProps> = ({
  header,
  body,
  alertIsOpen,
  closeAlert,
  onSubmit,
  closeModal,
}) => {
  const cancelRef = useRef<any>()

  return (
    <AlertDialog
      isOpen={alertIsOpen}
      leastDestructiveRef={cancelRef}
      onClose={closeAlert}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          {header && (
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {header}
            </AlertDialogHeader>
          )}

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeAlert}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                closeAlert()
                onSubmit && onSubmit()
                closeModal && closeModal()
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
