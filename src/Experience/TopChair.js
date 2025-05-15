import * as THREE from 'three'

import Experience from './Experience.js'
import ChatWindow from './ChatWindow.js'

export default class TopChair
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.world = this.experience.world
        this.time = this.experience.time

        // Create chat window
        this.chatWindow = new ChatWindow()

        this.setModel()
        this.setupInteraction()
    }

    setModel()
    {
        this.model = {}

        this.model.group = this.resources.items.topChairModel.scene.children[0]
        this.scene.add(this.model.group)
        
        this.model.group.traverse((_child) =>
        {
            if(_child instanceof THREE.Mesh)
            {
                _child.material = this.world.baked.model.material
                // Make the mesh interactive
                _child.userData.isInteractive = true
            }
        })
    }

    setupInteraction()
    {
        // Create raycaster for click detection
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()

        // Add click event listener
        window.addEventListener('click', (event) => {
            // Calculate mouse position in normalized device coordinates
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1

            // Update the picking ray with the camera and mouse position
            this.raycaster.setFromCamera(this.mouse, this.experience.camera.instance)

            // Calculate objects intersecting the picking ray
            const intersects = this.raycaster.intersectObjects(this.scene.children, true)

            // Check if we clicked on the chair
            for (const intersect of intersects) {
                if (intersect.object.userData.isInteractive) {
                    this.chatWindow.toggle()
                    break
                }
            }
        })
    }

    update()
    {
        this.model.group.rotation.y = Math.sin(this.time.elapsed * 0.0005) * 0.5
    }
}