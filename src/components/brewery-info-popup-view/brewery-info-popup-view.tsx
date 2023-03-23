import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react"
import { FC, useState } from "react"
import useWindowSize from "../../hooks/useWindowSize"
import { useBreweryCardContext } from "../brewery-card/brewery-card-context"
import BreweryInfoView from "../brewery-info-view/brewery-info-view"
import ReviewBreweryView from "../review-brewery-view/review-brewery-view"
import ReviewListView from "../review-list-view/review-list-view"
import { BreweryInfoPopupViewProps } from "./brewery-info-popup-view.props"

/**
 * Conditionally renders a drawer or modal for the ReviewBreweryView
 * Depends on screen size
 */
const BreweryInfoPopupView: FC<BreweryInfoPopupViewProps> = ({
  onOpen,
  onClose,
  isOpen,
}) => {
  const [reviewBrewery, setReviewBrewery] = useState(false)
  const { isSmallView } = useWindowSize()
  const { brewery, userRatingExist } = useBreweryCardContext()
  const handleReviewDisplay = () => setReviewBrewery(true)

  const { breweryRatings } = useBreweryCardContext()

  const breweryContent = !reviewBrewery ? (
    <>
      <BreweryInfoView />
      <Button onClick={handleReviewDisplay}>
        {userRatingExist ? "Edit your review" : "Write a review"}
      </Button>
      <ReviewListView breweryRatings={breweryRatings} />
    </>
  ) : (
    <>
      <BreweryInfoView />
      <ReviewBreweryView onClose={onClose} />
    </>
  )

  // Drawer if small view
  if (isSmallView) {
    return (
      <Drawer
        {...{ onOpen, isOpen, onClose }}
        onCloseComplete={() => setReviewBrewery(false)}
        placement="bottom"
        //  finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent px="8" py="6">
          {/* <DrawerCloseButton /> */}
          <DrawerBody>{breweryContent}</DrawerBody>
          <DrawerFooter p="0" mt="4">
            <Button onClick={onClose}>Cancel</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  // Modal if not small view
  return (
    <Modal
      {...{ onOpen, onClose, isOpen }}
      onCloseComplete={() => setReviewBrewery(false)}
    >
      <ModalOverlay />
      <ModalContent px="8" py="6">
        {/* <ModalCloseButton /> */}
        {breweryContent}
        <ModalFooter p="0" mt="4">
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BreweryInfoPopupView
