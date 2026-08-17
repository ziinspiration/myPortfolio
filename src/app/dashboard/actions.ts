"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getString = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

const uploadFile = async (file: FormDataEntryValue | null, folder: string) => {
  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(error ?? new Error("Upload Cloudinary gagal."));
          return;
        }

        resolve(result.secure_url);
      },
    );

    stream.end(buffer);
  });
};

export async function saveProfile(formData: FormData) {
  const name = getString(formData.get("name"));
  const role = getString(formData.get("role"));
  const summaryEn = getString(formData.get("summaryEn"));
  const summaryId = getString(formData.get("summaryId"));
  const email = getString(formData.get("email"));
  const github = getString(formData.get("github"));
  const linkedin = getString(formData.get("linkedin"));
  const instagram = getString(formData.get("instagram"));

  if (!name || !role || !summaryEn || !summaryId || !email) {
    throw new Error("Data profil wajib diisi.");
  }

  const existingProfile = await prisma.profile.findFirst();

  let photoUrl = existingProfile?.photoUrl ?? null;
  let cvEnUrl = existingProfile?.cvEnUrl ?? null;
  let cvIdUrl = existingProfile?.cvIdUrl ?? null;

  const uploadedPhoto = await uploadFile(
    formData.get("photo"),
    "ilham-portfolio/profile",
  );

  const uploadedCvEn = await uploadFile(
    formData.get("cvEn"),
    "ilham-portfolio/cv",
  );

  const uploadedCvId = await uploadFile(
    formData.get("cvId"),
    "ilham-portfolio/cv",
  );

  if (uploadedPhoto) {
    photoUrl = uploadedPhoto;
  }

  if (uploadedCvEn) {
    cvEnUrl = uploadedCvEn;
  }

  if (uploadedCvId) {
    cvIdUrl = uploadedCvId;
  }

  const data = {
    name,
    role,
    summaryEn,
    summaryId,
    email,
    github,
    linkedin,
    instagram,
    photoUrl,
    cvEnUrl,
    cvIdUrl,
  };

  if (existingProfile) {
    await prisma.profile.update({
      where: {
        id: existingProfile.id,
      },
      data,
    });
  } else {
    await prisma.profile.create({
      data,
    });
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
}

export async function saveSkill(formData: FormData) {
  const id = getString(formData.get("id"));
  const name = getString(formData.get("name"));
  const sortOrderValue = getString(formData.get("sortOrder"));
  const imageUrlValue = getString(formData.get("imageUrl"));

  if (!name) {
    throw new Error("Nama skill wajib diisi.");
  }

  let imageUrl = imageUrlValue;

  const uploadedImage = await uploadFile(
    formData.get("image"),
    "ilham-portfolio/skills",
  );

  if (uploadedImage) {
    imageUrl = uploadedImage;
  }

  if (!imageUrl) {
    throw new Error("Gambar skill wajib diisi.");
  }

  const sortOrder = Number.parseInt(sortOrderValue || "0", 10);

  const normalizedSortOrder = Number.isNaN(sortOrder) ? 0 : sortOrder;

  if (id) {
    await prisma.skill.update({
      where: {
        id,
      },
      data: {
        name,
        imageUrl,
        sortOrder: normalizedSortOrder,
      },
    });
  } else {
    await prisma.skill.create({
      data: {
        name,
        imageUrl,
        sortOrder: normalizedSortOrder,
        isActive: true,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
}

export async function deleteSkill(formData: FormData) {
  const id = getString(formData.get("id"));

  if (!id) {
    throw new Error("ID skill tidak ditemukan.");
  }

  await prisma.skill.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
}

export async function toggleSkill(formData: FormData) {
  const id = getString(formData.get("id"));

  if (!id) {
    throw new Error("ID skill tidak ditemukan.");
  }

  const skill = await prisma.skill.findUnique({
    where: {
      id,
    },
  });

  if (!skill) {
    throw new Error("Skill tidak ditemukan.");
  }

  await prisma.skill.update({
    where: {
      id,
    },
    data: {
      isActive: !skill.isActive,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
}
