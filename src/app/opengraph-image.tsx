import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

export const alt = "SmartPlace";
export const size = {
    width: 800,
    height: 400,
};

export const contentType = "image/jpg";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    fontSize: 32,
                    fontWeight: 600,
                }}
            >
                <div style={{ marginTop: 40 }}>SmartPlace ! </div>
                <p>Largest Smartphone Marketplace in This Planet !</p>
            </div>
        ),

        // ImageResponse options
        {
            ...size,
        }
    );
}
