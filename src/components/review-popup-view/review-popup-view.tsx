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
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
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
  const user = useUser()
  const supabase = useSupabaseClient()

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
          {user ? (
            <>
              <DrawerHeader>Review {brewery.name}</DrawerHeader>
              <DrawerBody>
                <ReviewBreweryView />
              </DrawerBody>
            </>
          ) : (
            <>
              <DrawerHeader>
                Please login or signup to review {brewery.name}
              </DrawerHeader>
              <DrawerBody>
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  theme="dark"
                />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Modal {...{ onOpen, onClose, isOpen, onCloseComplete }}>
      <ModalOverlay />
      <ModalContent>
        {user ? (
          <>
            <ModalHeader>Review {brewery.name}</ModalHeader>
            <ModalCloseButton />
            <ReviewBreweryView />
          </>
        ) : (
          <>
            <ModalHeader>
              Please login or signup to review {brewery.name}
            </ModalHeader>
            <ModalCloseButton />
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
            />
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ReviewPopupView
