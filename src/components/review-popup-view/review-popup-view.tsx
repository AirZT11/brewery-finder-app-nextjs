import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { FC } from "react"
import useWindowSize from "../../hooks/useWindowSize"
import { useBreweryCardContext } from "../brewery-card/brewery-card-context"
import ReviewBreweryView from "../review-brewery-view/review-brewery-view"
import { ReviewPopupViewProps } from "./review-popup-view.props"

/**
 * Conditionally renders a drawer or modal for the ReviewBreweryView
 * Depends on screen size
 */
const ReviewPopupView: FC<ReviewPopupViewProps> = ({
  onOpen,
  onClose,
  isOpen,
  onCloseComplete,
}) => {
  const { isSmallView } = useWindowSize()
  const { brewery } = useBreweryCardContext()

  if (isSmallView) {
    return (
      <Drawer
        {...{ isOpen, onClose, onCloseComplete }}
        placement="bottom"
        //  finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Review {brewery.name}</DrawerHeader>

          <DrawerBody>
            <ReviewBreweryView />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Modal {...{ onOpen, onClose, isOpen, onCloseComplete }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Review {brewery.name}</ModalHeader>
        <ModalCloseButton />
        <ReviewBreweryView />
      </ModalContent>
    </Modal>
  )
}

export default ReviewPopupView
