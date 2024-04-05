const { createApp } = Vue;

createApp({
    data() {
        return {
            // Indice per gli array
            truthIndex: 0,
            // Input dell'utente per inviare i messaggi
            chatMessageInput: '',
            // Messaggio automatico che attiva il setTimeout
            okMessage: null,
            // Input che può usare l'utente per cercare una persona tra quelle nell'address book
            inputToSearchUser: '',
            // Variabile per creare un toggle per far comparire o no il dorpdown
            showDropdown: false,

            truthMessageIndex: 0,
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
        imageSource: function(dynamicImage) {
            const pathImage = './img/avatar'
            const extensionImage = '.jpg'
            const imageSourceCompleted = pathImage + dynamicImage + extensionImage
            return imageSourceCompleted
        },

        userSelected: function(indexContacts) {
            this.truthIndex = indexContacts
        },

        messageChat: function(indexContacts) {
          const newMessage = {
            date: '10/01/2020 15:50:00',
            message: this.chatMessageInput,
            status: 'sent'
          };
          this.contacts[indexContacts].messages.push(newMessage);
          this.chatMessageInput = '';

          // Aggiungiamo il TimeOut per far partire un messaggio in automatico e lo pushiamo all'interno dell'array "messsages" che si trova all'interno dell'array di oggetti di "contacts"
          const automatedMessage = {
            date: '',
            message: 'ok',
            status: 'received'
          }

          this.okMessage = setTimeout(() => {
            this.contacts[indexContacts].messages.push(automatedMessage)
          }, 2000);
          
        },

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

        clickDropdown: function(indexContact, indexMessage) {
          this.truthIndex = indexContact
          this.truthMessageIndex = indexMessage

          this.showDropdown = !this.showDropdown
        },

        deleteMessage: function(indexMessage) {
          this.contacts[this.truthIndex].messages.splice(indexMessage, 1)
          console.log(this.contacts[this.truthIndex].messages);
        }
    },
    mounted() {
      this.searchUser()
    }
  
}).mount('#app');