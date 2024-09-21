import { Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InitialNameAvatar from './InitialNameAvatar';

// Default image URI in case no image or name is provided
const defaultImageUri = "https://i.pravatar.cc/150?u=aguilarduke@marketoid.com"

// Component to render a single avatar
const SingleAvatar = ({ uri, name, size = 50, style }: any) => {
    const [img, setImg] = useState(uri);

    // Update the image URI
    useEffect(() => {
        setImg(uri);
    }, [uri]);

    // If no image or name is provided, render the default image
    if (!img && !name) {
        return (
            <Image
                source={{ uri: defaultImageUri }}
                style={[{ width: size, height: size, borderRadius: size }, style]}
            />
        )
    }

    // Render the image if available, otherwise render initials avatar
    return (
        img ?
            <Image
                source={{ uri: img }}
                style={[{ width: size, height: size, borderRadius: size }, style]}
                onError={() => setImg('')}
            />
            :
            <InitialNameAvatar size={size} name={name} style={style} />
    )
}

// Component to render a double avatar
const DoubleAvatar = ({ uri1, name1, uri2, name2, size = 50, style }: any) => {
    const [img1, setImg1] = useState(uri1);
    const [img2, setImg2] = useState(uri2);

    useEffect(() => {
        setImg1(uri1);
    }, [uri1]);

    useEffect(() => {
        setImg2(uri2);
    }, [uri2]);

    const outerSize = size;
    const innerSize = outerSize * 2 / 3;

    // If no image or name is provided, render the default image
    return (
        <View style={[{
            // borderRadius: outerSize,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: outerSize, height: outerSize,
        }, style]}>
            <SingleAvatar
                uri={img2}
                name={name2}
                size={innerSize}
                style={{
                    position: 'absolute', top: 0, left: 0
                }}
            />
            <SingleAvatar
                uri={img1}
                name={name1}
                size={innerSize}
                style={{
                    borderColor: 'white',
                    borderWidth: 2,
                    position: 'absolute', bottom: 0, right: 0
                }}
            />
        </View>
    );
};

// Main Avatar component to handle single or double avatar cases
const Avatar = ({ img = '', size = 50, name = '', style }: any) => {
    img = img || '';
    name = name || '';

    let groupImg;
    let imgArray = img.split(',').map((e: string) => e.trim());
    let nameArray = name.split(',').map((e: string) => e.trim());

    // If no image or name is provided, render the default image
    if (imgArray.length <= 1) {
        groupImg = <SingleAvatar uri={imgArray[0]} name={nameArray[0]} size={size} style={style} />;
    }
    else {
        // Handle multiple images/names
        const imgNameArr = imgArray.map((e: string, i: number) => [e, nameArray[i] || '']);
        let res = [];

        // Push avatars with both image and name
        for (let i = 0; i < imgNameArr.length; i++) {
            if (imgNameArr[i][0])
                res.push(imgNameArr[i])
        }

        // Push avatars with only name
        for (let i = 0; i < imgNameArr.length && res.length < 2; i++) {
            if (!imgNameArr[i][0] && imgNameArr[i][1])
                res.push(imgNameArr[i])
        }

        // Push empty avatars
        while (res.length < 2) {
            res.push(['', '']);
        }

        // Render the group avatar
        groupImg = <DoubleAvatar
            uri1={res[0][0]} name1={res[0][1]}
            uri2={res[1][0]} name2={res[1][1]}
            size={size} style={style} />;
    }
    return groupImg;
}

export {
    SingleAvatar,
    DoubleAvatar,
    Avatar
}

