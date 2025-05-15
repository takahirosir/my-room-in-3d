import Experience from './Experience.js'

export default class ChatWindow {
    constructor() {
        this.experience = new Experience()
        this.createChatWindow()
        this.isVisible = false
        this.setupEventListeners()
    }

    createChatWindow() {
        // Create chat window container
        this.container = document.createElement('div')
        this.container.className = 'chat-window'
        this.container.style.display = 'none'

        // Create chat header
        const header = document.createElement('div')
        header.className = 'chat-header'
        header.innerHTML = `
            <h3>Chat with Chair</h3>
            <button class="close-chat">×</button>
        `

        // Create chat messages container
        this.messagesContainer = document.createElement('div')
        this.messagesContainer.className = 'chat-messages'

        // Create chat input area
        const inputArea = document.createElement('div')
        inputArea.className = 'chat-input'
        inputArea.innerHTML = `
            <input type="text" placeholder="Type your message..." />
            <button class="send-message">Send</button>
        `

        // Append all elements
        this.container.appendChild(header)
        this.container.appendChild(this.messagesContainer)
        this.container.appendChild(inputArea)
        document.body.appendChild(this.container)

        // Store input elements
        this.input = inputArea.querySelector('input')
        this.sendButton = inputArea.querySelector('.send-message')
        this.closeButton = header.querySelector('.close-chat')
    }

    setupEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage())
        
        // Send message on Enter key
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage()
        })

        // Close chat window
        this.closeButton.addEventListener('click', () => this.hide())
    }

    async sendMessage() {
        const message = this.input.value.trim()
        if (!message) return

        // Add user message to chat
        this.addMessage('user', message)
        this.input.value = ''

        try {
            // Show typing indicator
            this.addTypingIndicator()

            // Simulate AI response (replace with actual API call)
            const response = await this.getAIResponse(message)
            
            // Remove typing indicator and add AI response
            this.removeTypingIndicator()
            this.addMessage('ai', response)
        } catch (error) {
            console.error('Error getting AI response:', error)
            this.removeTypingIndicator()
            this.addMessage('error', 'Sorry, I had trouble responding. Please try again.')
        }
    }

    addMessage(type, content) {
        const messageDiv = document.createElement('div')
        messageDiv.className = `message ${type}-message`
        messageDiv.textContent = content
        this.messagesContainer.appendChild(messageDiv)
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
    }

    addTypingIndicator() {
        const indicator = document.createElement('div')
        indicator.className = 'typing-indicator'
        indicator.innerHTML = '<span></span><span></span><span></span>'
        this.messagesContainer.appendChild(indicator)
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
    }

    removeTypingIndicator() {
        const indicator = this.messagesContainer.querySelector('.typing-indicator')
        if (indicator) indicator.remove()
    }

    async getAIResponse(message) {
        // TODO: Replace with actual API call to your AI backend
        // For now, return a simple response
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
        return `I am an AI-powered chair. You said: "${message}". How can I help you today?`
    }

    show() {
        this.container.style.display = 'flex'
        this.isVisible = true
        this.input.focus()
    }

    hide() {
        this.container.style.display = 'none'
        this.isVisible = false
    }

    toggle() {
        if (this.isVisible) {
            this.hide()
        } else {
            this.show()
        }
    }
} 