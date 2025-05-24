import React from "react";
import axiosInstance from "../config/axiosInstance";

export const handleImageFileUpload = async (
    urlSetter,
    fileSetter,
    uploadStatus,
    file
) => {
    if (file) {
        uploadStatus(true);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await axiosInstance.post(
                `/upload/image`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            urlSetter(response.data.url);
            fileSetter(null);
            uploadStatus(false);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    } else {
        return;
    }
};

export const handleVideoFileUpload = async (
    urlSetter,
    fileSetter,
    uploadStatus,
    file
) => {
    if (file) {
        uploadStatus(true);
        const formData = new FormData();
        formData.append("video", file);
        try {
            const response = await axiosInstance.post(
                `/upload/video`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            urlSetter(response.data.url);
            fileSetter(null);
            uploadStatus(false);
            console.log(response.data.url);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    } else {
        return;
    }
};

export const handleImageFileDelete = async (
    filename,
    imageUrlDefaultSetter,
    deleteStatus
) => {
    try {
        deleteStatus(true);
        const response = await axiosInstance.delete(
            `/upload/image/${filename}`
        );
        imageUrlDefaultSetter("");
        deleteStatus(false);
        console.log(response.data.message);
    } catch (error) {
        console.error("Error deleting file:", error);
    }
};

export const handleVideoFileDelete = async (filename, videoUrlDefaultSetter, deleteStatus) => {
    try {
        deleteStatus(true);
        const response = await axiosInstance.delete(
            `/upload/video/${filename}`
        );
        videoUrlDefaultSetter(""); 
        deleteStatus(false);
        console.log(response.data.message);
    } catch (error) {
        console.error("Error deleting file:", error);
    }
};