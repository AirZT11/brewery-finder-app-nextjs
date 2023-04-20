import React, { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "../../utils/database.types"
import Image from "next/image"
import { Flex, FormLabel, Text } from "@chakra-ui/react"
type Profiles = Database["public"]["Tables"]["profiles"]["Row"]

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string
  url: Profiles["avatar_url"]
  size: number
  onUpload?: (url: string) => void
}) {
  const supabase = useSupabaseClient<Database>()
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url]) // eslint-disable-line

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log("Error downloading image: ", error)
    }
  }

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }

      const file = event.target.files[0]
      const fileExt = file.name.split(".").pop()
      const fileName = `${uid}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      onUpload && onUpload(filePath)
    } catch (error) {
      alert("Error uploading avatar!")
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Flex flexDirection="column" w="full" align="center">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          height={size}
          width={size}
        />
      ) : (
        <>
          <Image
            src={"/noun-drinking-beer-886388.svg"}
            alt="avatar no-image"
            height={size}
            width={size}
          />
        </>
      )}
      {onUpload && (
        <div style={{ width: size }}>
          <FormLabel
            htmlFor="single"
            _hover={{ background: "gray.200" }}
            transition={"100ms"}
            cursor="pointer"
            p="2"
            bg="gray.100"
            borderRadius={6}
            mt="2"
            textAlign={"center"}
          >
            {uploading ? "Uploading ..." : "Upload new image"}
          </FormLabel>
          <input
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      )}
    </Flex>
  )
}
