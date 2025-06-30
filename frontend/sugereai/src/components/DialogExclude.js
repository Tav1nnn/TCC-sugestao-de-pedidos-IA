import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"

const DialogExclude = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content mt={20} mr={8} ml={8} minH={200} maxH={'auto'} backgroundColor={"#2D2C31"} className="DialogContent" p={4} borderRadius="md" borderWidth="1px" borderColor="#A10808">
                        <Dialog.Header display={"flex"} justifyContent="space-between" alignItems="center">
                            <Dialog.Title>Confirmar Exclusão</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" onClick={onClose} bg={'#2D2C31'} border={'1px solid #A10808'} color={'white'}/>
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body mt={4} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2}>
                            <p>Tem certeza que deseja realizar a exclusão? Essa ação não poderá ser desfeita!</p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" onClick={onClose} size="sm" p={2} border={'1px solid #A10808'} color={'white'}>Cancelar</Button>
                            </Dialog.ActionTrigger>

                            <Button variant="outline" size="sm"border={'1px solid #A10808'} color={'white'} style={{ padding: '6px', color: '#fff', backgroundColor: '#2D2C31' }} onClick={onConfirm}>
                                Confirmar
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default DialogExclude
