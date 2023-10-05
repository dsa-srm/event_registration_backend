export class UserQueries {
	static async fetchUserByReg(t: any, reg: string) {
		return await t.oneOrNone("SELECT id FROM public.users WHERE reg = $1", [
			reg,
		]);
	}
	static async fetchUserByRegAndMail(t: any, reg: string, email: string) {
		return await t.oneOrNone(
			"SELECT id FROM public.users WHERE reg = $1 or email = $2",
			[reg, email]
		);
	}

	static async addUser(
		t: any,
		id: string,
		name: string,
		phone: number,
		reg: string,
		email: string,
		department: string,
		year: number,
		created_at: string,
		updated_at: string
	) {
		return await t.none(
			"INSERT INTO public.users(id, name, phone, reg, email, department, year, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
			[id, name, phone, reg, email, department, year, created_at, updated_at]
		);
	}
}
