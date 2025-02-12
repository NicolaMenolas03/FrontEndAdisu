import { useState } from "react";
import { motion } from "framer-motion";
import { View, Image, StyleSheet } from 'react-native';

export default function EggReveal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="relative h-screen flex items-center justify-center">
      {!isOpen && (
        <motion.div
          className="absolute bottom-10 right-0 cursor-pointer" // Posiziona a destra
          initial={{ opacity: 1, scale: 0.2 }} // Uovo ridotto
          animate={{ opacity: 1, scale: 0.2 }}  // Uovo sempre piccolo
          whileHover={{ scale: 0.25 }} // Leggero ingrandimento al passaggio del mouse
          onClick={() => setIsOpen(true)}
        >
          <Image source={require('@/assets/images/Uovo_pokemon.png')} alt="Egg" width={100} height={100} />
        </motion.div>
      )}

      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <motion.div
            className="relative w-full h-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20 }}
          >
            <Image source={require('@/assets/images/Cristian.jpeg')} alt="Revealed Image" width={500} height={500}  style={{position: 'absolute',alignItems: 'center'}}/>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
