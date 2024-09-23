import PhotoGallery from '@/components/PhotoGallery'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex flex-col py-2 gap-8'>
        <div className='flex justify-between items-center max-md:flex-col max-md:items-start gap-2'>

        <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">Share & Inspire</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-regular">
              Community Gallery
              </h2>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
              Discover creativity of our users. Browse stunning images and their inspiring prompts.
              </p>
            </div>
        </div>

        <Button size="lg" className="gap-4"  variant="default" asChild>
            <Link href="/new-post" className="">
                Generate Your Image
            </Link>
        </Button>

        </div>
          <Separator/>
        <main>
        <PhotoGallery/>
        </main>
    </div>
  )
}

export default page
