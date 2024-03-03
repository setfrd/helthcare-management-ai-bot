import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const doctorId = parseInt(id, 10); // Ensure the id is an integer
            const result = await prisma.doctor.delete({
                where: { id: doctorId },
            });
            res.json(result);
        } catch (error) {
            console.error("Error deleting doctor:", error);
            res.status(500).send("Error deleting doctor");
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
