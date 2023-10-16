const { PrismaClient } = require('@prisma/client');

 async function main() {
    const json = {
        "cutting_tools": [
            "Carbide Burrs",
            "Hole Saws",
            "Jet Broach Cutter"
        ],
        "hand_tools": [
            "Grease Gun",
            "L-Wrench",
            "Suction Lifting"
        ],
        "hoists": [
            "Chain Block",
            "Geared Trolley",
            "Level Hoist",
            "Plain Trolley",
            "Wire Rope Winch"
        ],
        "Measuring_Tools_&_Inspection": [
            "Levelling Laser",
            "Laser Distance Meter",
            "Level",
            "Penrtrant Testing Spray"
        ],
        "Piping_Tools_&_Equipment": [
            "Pipe Fitting",
            "Band & Buckle Clamp"
        ],
        "Pneumatic_Tools": [
            "Reels"
        ],
        "Power_Tools": [
            "Accessories",
            "Blower",
            "Chisel Hammer",
            "Cutting Machine",
            "Circular Saw",
            "Double-Ended Bench Grinding Manchines"
        ],
        "Safety_Tools & Personal Protection": [
            "Anti-Slip Tape",
            "Fiberglass Ladder",
            "Safety Shoes"
        ],
        "Tool_Storage": [],
        "Torque_Tools": [
            "Torque Screwdrivers",
            "Torque Wrench"
        ]
    };
    const prismadb = new PrismaClient();
    let arrayData: {
        categoryId: string;
        name: string;
    }[] = [];
    for (const [key, value] of Object.entries(json)) {
        const categoryName = key.replace(/\_/g, " ");
        const category = await prismadb.category.findFirst({ where: { name: categoryName } });
        for (let v of value) {
            arrayData.push({ categoryId: category.id, name: v });
        }
    }
    await prismadb.subCategory.createMany({
        data: arrayData
    });
    return arrayData;
};

main().then(res => {
    console.log(res)
}) .catch((error) => {
console.log(error)
})