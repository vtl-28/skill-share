import {  AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    AlertDialogCloseButton,  } from '@chakra-ui/react';
import React, { useState } from 'react';

function ErrorAlert({message}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    return(
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
              {message}
            </AlertDialogBody>

          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )
}

export { ErrorAlert }
   