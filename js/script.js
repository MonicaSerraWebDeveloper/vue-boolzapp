const { createApp } = Vue;
const dt = luxon.DateTime;
createApp({
    data() {
        return {
            // Indice per l'array principale di contacts
            truthIndex: 0,
            // Indice per l'array dei messages
            truthMessageIndex: 0,
            // Input dell'utente per inviare i messaggi
            chatMessageInput: '',
            // Messaggio automatico che attiva il setTimeout
            okMessage: null,
            // Input che può usare l'utente per cercare una persona tra quelle nell'address book
            inputToSearchUser: '',
            // Variabile per creare un toggle per far comparire o no il dorpdown
            showDropdown: false,
            // Stabiliamo una variabile falsa di deafault per mostrare l'icona
            showIconChevron: false,

            contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                  },
                  {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                  },
                  {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                  },
                  {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                  },
                  {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                  }
                ],
              },
            ],
        };
    },
    methods: {
        // Creiamo una variabile dentro la funzione per legare insieme tutti gli elementi che andranno a dare l'immagine dinamiche ai contatti nell'aside degli Address Book
        imageSource: function(dynamicImage) {
            const pathImage = './img/avatar'
            const extensionImage = '.jpg'
            const imageSourceCompleted = pathImage + dynamicImage + extensionImage
            return imageSourceCompleted
        },

        // Creiamo la funzione per selezionare correttamente l'utente che viene cliccato nell'aside dell'address book
        userSelected: function(indexContacts) {
          this.truthIndex = indexContacts
        },

        // Creiamo una variabile che ci permette di pushare un oggetto che contiene la data e l'ora in cui è stato inviato il messaggio, il messaggio e lo status del messaggio, mettiamo tutto dentro una variabile e pushiamo l'oggetto dentro l'array object di "messages"
        messageChat: function(indexContacts) {
          const newMessage = {
            date: dt.now().setLocale('it').toLocaleString(dt.DATE_SHORT) + ' ' + dt.now().setLocale('it').toLocaleString(dt.TIME_24_WITH_SECONDS),
            message: this.chatMessageInput,
            status: 'sent'
          };
          this.contacts[indexContacts].messages.push(newMessage);
          this.chatMessageInput = '';

        // Aggiungiamo il TimeOut per far partire un messaggio in automatico e lo pushiamo all'interno dell'array "messsages" che si trova all'interno dell'array di oggetti di "contacts"
        const automatedMessage = {
          date: dt.now().setLocale('it').toLocaleString(dt.DATE_SHORT) + ' ' + dt.now().plus({ seconds: 2 }).setLocale('it').toLocaleString(dt.TIME_24_WITH_SECONDS),
          message: 'ok',
          status: 'received'
        }

        this.okMessage = setTimeout(() => {
          this.contacts[indexContacts].messages.push(automatedMessage)
        }, 2000);
        
        },

        // Creiamo una funzione che ci permette di cercare gli utenti nella barra di ricerca dei nostri contatti nell'aside di Address Book, con un ciclo forEach andiamo a ciclare il nostro array object per prendere di volta in volta la chiave "name" che ci occorre per confrontare la stringa del nome a ciò che viene scritto nel campo input della ricerca utente. Dentro il ciclo for stabiliamo una variabile in cui richiamiamo la variabile vuota che è collegata al v-model con includes verifichiamo che ciò che viene scritto sia uguale e se la chiave dentro contacts "corrisponde" a true allora la condizione è verificata altrimenti no e il contatto sarà visibile nell'aside di Address Book oppure no. per riuscire a filtrare correttamente la funzione è stata richiamata nel campo input tramite l'evento @input
        searchUser: function() {
          this.contacts.forEach(contact => {
            const inputLowerCase = this.inputToSearchUser.toLowerCase()
            if(contact.name.toLowerCase().includes(inputLowerCase)) {
              contact.visible = true
            } else {
              contact.visible = false
            }
          });
        },

        // Stabiliamo con la funzione che l'icona chevron si vede solo quando la variabile è vera
        showTheIcon: function(indexMessage) {
          this.truthMessageIndex = indexMessage
          this.showIconChevron = true;
        },

        // Stabiliamo con la funzione che l'icona chevron deve rimanere nascosta 
        hideIcon: function() {
          this.showIconChevron = false
        },

        // Creiamo una funzione che ci permette di mostrare al click una finestra con delle opzioni all'interno nei messaggi della chat, per farlo abbiamo stabilito prima una variabile "showDropdown" che ha un valore booleano e il click funziona solo quando questa variabile è il contrario di se stessa, in questo modo abbiamo creato una sorta di toggle, definiamo anche due argomenti per richiamare correttamente la finestra per il messaggio che clicchiamo
        clickDropdown: function(indexContact, indexMessage) {
          this.truthIndex = indexContact
          this.truthMessageIndex = indexMessage

          this.showDropdown = !this.showDropdown
        },

        // Creiamo una funzione che ci permette di chiudere il dropdown opzionale del singolo messaggio ogni volta che viene fatto un click ovunque tranne che sull'icona dello chevron. Se si clicca sull'icona allora il clickDown si attiva se si clicca altrove se il clickDown è attivo questo si chiude se non attivo rimane chiuso
        closeDropdown: function($event) {

          if (!$event.target.classList.contains('fa-chevron-down')) {
            this.showDropdown = false
          } else if ($event.target.classList.contains('fa-chevron-down') && this.showDropdown === true) {
            this.showDropdown = true
          }
        },

        // Creiamo una funzione che ci permette di eliminare un oggetto all'interno dell'array "messages" una volta che viene cliccata l'opzione all'interno della finestra dei dropdown "delete"
        deleteMessage: function(indexMessage) {
          this.contacts[this.truthIndex].messages.splice(indexMessage, 1)
        }
    },

  
}).mount('#app');