import { createItem } from '@directus/sdk';
import { getDirectusClient } from './directus';

export const useCreateNewsletterSubscription = async (formdata: any) => {
    const client = await getDirectusClient()
    
    try {
        await client.request(
            createItem('form_submissions', formdata)
        )
    } catch (error) {
        console.error('Failed to create newsletter subscription:', error)
    }
}

export const useCreateContactFormSubmission = async (formdata: any) => {
    const client = await getDirectusClient()
    
    try {
        await client.request(
            createItem('form_submissions', formdata)
        )
    } catch (error) {
        console.error('Failed to create contact form submission:', error)
    }
}